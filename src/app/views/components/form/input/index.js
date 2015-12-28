import TextField from 'material-ui/lib/text-field'
import ColHelper from './../../helpers/col'


class Input extends React.Component {

    constructor(props){
        super(props);

        if(props.mask){

            this.charsRules = {
                "9": "[0-9]",
                "a": "[A-Za-z]",
                "*": "[A-Za-z0-9]"
            };

            var mask = this.parseMask(props.mask);

            this.mask = mask.mask;
            this.permanents = mask.permanents;
            this.maskChar = props.maskChar || "_";

        }

        this.state = {
            valid: true
        };

    }

    componentWillReceiveProps (nextProps) {

        if(!this.props.mask) return;

        var mask = this.parseMask(nextProps.mask);

        this.mask       = mask.mask;
        this.permanents = mask.permanents;
        this.maskChar   = nextProps.maskChar || '_';

    }

    getInputDOMNode() {
        var input = this.refs.input;

        input = ReactDOM.findDOMNode(input).getElementsByTagName('input')[0]

        if (!input) {
            return null;
        }

        return input;

    }

    getPrefix() {
        var prefix = "";
        var mask = this.mask;

        for (var i = 0; i < mask.length && this.isPermanentChar(i); ++i) {
            prefix += mask[i];
        }
        return prefix;
    }

    getFilledLength() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

        var i;
        var maskChar = this.maskChar;

        if (!maskChar) {
            return value.length;
        }

        for (i = value.length - 1; i >= 0; --i) {
            var char = value[i];
            if (!this.isPermanentChar(i) && this.isAllowedChar(char, i)) {
                break;
            }
        }

        return ++i || this.getPrefix().length;
    }

    getLeftEditablePos(pos) {
        for (var i = pos; i >= 0; --i) {
            if (!this.isPermanentChar(i)) {
                return i;
            }
        }
        return null;
    }

    getRightEditablePos(pos) {

        for (var i = pos; i < this.mask.length; ++i) {
            if (!this.isPermanentChar(i)) {
                return i;
            }
        }
        return null;
    }

    isEmpty() {

        var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

        return !value.split("").some((char, i) => {
            return !this.isPermanentChar(i) && this.isAllowedChar(char, i);
        });
    }

    isFilled() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

        return this.getFilledLength(value) === this.mask.length;
    }

    pasteText(value, text, selection, event) {
        var caretPos = selection.start;
        if (selection.length) {
            value = this.clearRange(value, caretPos, selection.length);
        }
        var textLen = this.getRawSubstrLength(value, text, caretPos);
        var value = this.insertRawSubstr(value, text, caretPos);
        caretPos += textLen;
        caretPos = this.getRightEditablePos(caretPos) || caretPos;
        if (value !== this.getInputDOMNode().value) {
            if (event) {
                event.target.value = value;
            }
            this.setState({
                value: value
            });
        }
        this.setCaretPos(caretPos);
    }

    createFilledArray(length, val) {
        var array = [];
        for (var i = 0; i < length; i++) {
            array[i] = val;
        }
        return array;
    }

    formatValue(value) {
        var maskChar = this.maskChar;
        var mask = this.mask;

        if (!maskChar) {
            var prefix = this.getPrefix();
            var prefixLen = prefix.length;
            value = this.insertRawSubstr("", value, 0);
            while (value.length > prefixLen && this.isPermanentChar(value.length - 1)) {
                value = value.slice(0, value.length - 1);
            }

            if (value.length < prefixLen) {
                value = prefix;
            }

            return value;
        }
        if (value) {
            var emptyValue = this.formatValue("");
            return this.insertRawSubstr(emptyValue, value, 0);
        }
        return value.split("").concat(this.createFilledArray(mask.length - value.length, null)).map((char, pos) => {
            if (this.isAllowedChar(char, pos)) {
                return char;
            } else if (this.isPermanentChar(pos)) {
                return mask[pos];
            }
            return maskChar;
        }).join("");
    }

    clearRange(value, start, len) {

        var end = start + len;
        var maskChar = this.maskChar;
        var mask = this.mask;

        if (!maskChar) {
            var prefixLen = this.getPrefix().length;
            value = value.split("").filter((char, i) => {
                return i < prefixLen || i < start || i >= end;
            }).join("");
            return this.formatValue(value);
        }
        return value.split("").map((char, i) => {
            if (i < start || i >= end) {
                return char;
            }
            if (this.isPermanentChar(i)) {
                return mask[i];
            }
            return maskChar;
        }).join("");
    }

    replaceSubstr(value, newSubstr, pos) {
        return value.slice(0, pos) + newSubstr + value.slice(pos + newSubstr.length);
    }

    insertRawSubstr(value, substr, pos) {
        var mask = this.mask;
        var maskChar = this.maskChar;

        var isFilled = this.isFilled(value);
        var prefixLen = this.getPrefix().length;
        substr = substr.split("");

        if (!maskChar && pos > value.length) {
            value += mask.slice(value.length, pos);
        }

        for (var i = pos; i < mask.length && substr.length;) {
            if (!this.isPermanentChar(i) || mask[i] === substr[0]) {
                var char = substr.shift();
                if (this.isAllowedChar(char, i, true)) {
                    if (i < value.length) {
                        if (maskChar || isFilled || i < prefixLen) {
                            value = this.replaceSubstr(value, char, i);
                        } else {
                            value = this.formatValue(value.substr(0, i) + char + value.substr(i));
                        }
                    } else if (!maskChar) {
                        value += char;
                    }
                    ++i;
                }
            } else {
                if (!maskChar && i >= value.length) {
                    value += mask[i];
                }
                ++i;
            }
        }
        return value;
    }

    getRawSubstrLength(value, substr, pos) {
        var mask = this.mask;

        substr = substr.split("");
        for (var i = pos; i < mask.length && substr.length;) {
            if (!this.isPermanentChar(i) || mask[i] === substr[0]) {
                var char = substr.shift();
                if (this.isAllowedChar(char, i, true)) {
                    ++i;
                }
            } else {
                ++i;
            }
        }
        return i - pos;
    }

    isAllowedChar(char, pos) {
        var allowMaskChar = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var mask = this.mask;
        var maskChar = this.maskChar;

        if (this.isPermanentChar(pos)) {
            return mask[pos] === char;
        }
        var ruleChar = mask[pos];
        var charRule = this.charsRules[ruleChar];
        return new RegExp(charRule).test(char || "") || allowMaskChar && char === maskChar;
    }

    isPermanentChar(pos) {
        return this.permanents.indexOf(pos) !== -1;
    }

    setCaretToEnd () {
        var filledLen = this.getFilledLength();
        var pos = this.getRightEditablePos(filledLen);
        if (pos !== null) {
            this.setCaretPos(pos);
        }
    }

    setSelection (start) {
        var len = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        var input = this.getInputDOMNode();
        if (!input) {
            return;
        }

        var end = start + len;
        if (input.selectionStart && input.selectionEnd) {
            input.selectionStart = start;
            input.selectionEnd = end;
        }
        //else {
        //    var range = input.selection.createTextRange();
        //    range.collapse(true);
        //    range.moveStart("character", start);
        //    range.moveEnd("character", end - start);
        //    range.select();
        //}
    }

    getSelection () {
        var input = this.getInputDOMNode();
        var start = 0;
        var end = 0;

        if (input.selectionStart && input.selectionEnd) {
            start = input.selectionStart;
            end = input.selectionEnd;
        } else {
            var range = document.createRange();
            if (range.parentElement === input) {
                start = -range.moveStart("character", -input.value.length);
                end = -range.moveEnd("character", -input.value.length);
            }
        }

        return {
            start: start,
            end: end,
            length: end - start
        };
    }

    getCaretPos () {
        return this.getSelection().start;
    }

    setCaretPos (pos) {
        var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) {
                setTimeout(fn, 0);
            };

        var setPos = this.setSelection.bind(this, pos, 0);

        setPos();
        raf(setPos);

        this.lastCaretPos = pos;
    }

    isFocused() {
        return document.activeElement === this.getInputDOMNode();
    }

    parseMask(mask) {

        if (typeof mask !== "string") {
            return {
                mask: null,
                permanents: []
            };
        }
        var str = "";
        var permanents = [];
        var isPermanent = false;

        mask.split("").forEach((char)=> {
            if (!isPermanent && char === "\\") {
                isPermanent = true;
            } else {
                if (isPermanent || !this.charsRules[char]) {
                    permanents.push(str.length);
                }
                str += char;
                isPermanent = false;
            }
        });

        return {
            mask: str,
            permanents: permanents
        };
    }

    getStringValue (value) {
        return !value && value !== 0 ? "" : value + "";
    }

    render() {

        var errorText = this.state.valid ? null : this.props.errorText || 'Ошибка!';

        var hint = this.props.mask || this.state.value ? null : this.props.hintText; //TODO (this.state.value removes hintText of a bug in onChange)

        var value = this.props.mask ? this.state.value : this.props.value;

        var placeholder = this.props.hintText ? null : this.props.placeholder;

        return (
            <TextField
                hintText={hint}
                placeholder={placeholder}
                floatingLabelText={this.props.label}
                floatingLabelStyle={this.props.labelStyle}
                hintStyle={this.props.hintStyle}
                multiLine={this.props.multiLine}
                defaultValue={this.props.defaultValue}
                underlineStyle={this.props.underlineStyle}
                value={value}
                underlineFocusStyle={this.props.underlineFocusStyle}
                underlineDisabledStyle={this.props.underlineDisabledStyle}
                fullWidth
                show={false}
                ref="input"
                name={this.props.name}
                errorText={errorText}
                errorStyle={this.props.errorStyle}
                disabled={this.props.disabled}
                type={this.props.type}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={this.onKeyDown.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
                onPaste={this.onPaste.bind(this)}
                onChange={this._onChange.bind(this)}/>
        )
    }

    onValidate(value){

        if(!this.props.regexp) return true;

        if(value.length === 0) return true;

        var regexp = this.props.regexp.split('/');

        regexp = new RegExp(regexp[1], regexp[2]);

        return regexp.test(value)
    }

    _onChange(e){

        this.setState({
            valid: this.onValidate(e.target.value),
            value: e.target.value
        });

        if(!this.props.mask) return;

        var mask = this.mask;

        var value = e.target.value;
        var oldValue = this.state.value;
        var clearedValue;

        var selection = this.getSelection();
        var caretPos = selection.end;
        var maskLen = mask.length;
        var valueLen = value.length;
        var oldValueLen = oldValue.length;
        var prefixLen = this.getPrefix().length;

        if (valueLen > oldValueLen) {
            var substrLen = valueLen - oldValueLen;
            var startPos = selection.end - substrLen;
            var enteredSubstr = value.substr(startPos, substrLen);

            if (startPos < maskLen && (substrLen !== 1 || enteredSubstr !== mask[startPos])) {
                caretPos = this.getRightEditablePos(startPos);
            } else {
                caretPos = startPos;
            }

            value = value.substr(0, startPos) + value.substr(startPos + substrLen);

            clearedValue = this.clearRange(value, startPos, maskLen - startPos);
            clearedValue = this.insertRawSubstr(clearedValue, enteredSubstr, caretPos);

            value = this.insertRawSubstr(oldValue, enteredSubstr, caretPos);

            if (substrLen !== 1 || caretPos >= prefixLen && caretPos < maskLen) {
                caretPos = this.getFilledLength(clearedValue);
            } else if (caretPos < maskLen) {
                caretPos++;
            }
        } else if (valueLen < oldValueLen) {
            var removedLen = maskLen - valueLen;
            clearedValue = this.clearRange(oldValue, selection.end, removedLen);
            var substr = value.substr(0, selection.end);
            var clearOnly = substr === oldValue.substr(0, selection.end);

            if (this.maskChar) {
                value = this.insertRawSubstr(clearedValue, substr, 0);
            }

            clearedValue = this.clearRange(clearedValue, selection.end, maskLen - selection.end);
            clearedValue = this.insertRawSubstr(clearedValue, substr, 0);

            if (!clearOnly) {
                caretPos = this.getFilledLength(clearedValue);
            } else if (caretPos < prefixLen) {
                caretPos = prefixLen;
            }
        }

        value = this.formatValue(value);

        this.setState({
            value: value
        });

        this.setCaretPos(caretPos);

    }

    onKeyDown(event) {

        if(!this.props.mask) return;

        var hasHandler = typeof this.props.onKeyDown === "function";
        if (event.ctrlKey || event.metaKey) {
            if (hasHandler) {
                this.props.onKeyDown(event);
            }
            return;
        }

        var caretPos = this.getCaretPos();
        var value = this.state.value;
        var key = event.key;
        var preventDefault = false;
        switch (key) {
            case "Backspace":
            case "Delete":
                var prefixLen = this.getPrefix().length;
                var deleteFromRight = key === "Delete";
                var selectionRange = this.getSelection();
                if (selectionRange.length) {
                    value = this.clearRange(value, selectionRange.start, selectionRange.length);
                } else if (caretPos < prefixLen || !deleteFromRight && caretPos === prefixLen) {
                    caretPos = prefixLen;
                } else {
                    var editablePos = deleteFromRight ? this.getRightEditablePos(caretPos) : this.getLeftEditablePos(caretPos - 1);
                    if (editablePos !== null) {
                        value = this.clearRange(value, editablePos, 1);
                        caretPos = editablePos;
                    }
                }
                preventDefault = true;
                break;
            default:
                break;
        }

        if (hasHandler) {
            this.props.onKeyDown(event);
        }

        if (value !== this.state.value) {
            event.target.value = value;
            this.setState({
                value: value
            });
            preventDefault = true;
            if (typeof this.props.onChange === "function") {
                this.props.onChange(event);
            }
        }
        if (preventDefault) {
            event.preventDefault();
            this.setCaretPos(caretPos);
        }
    }

    onKeyPress (event) {

        if(!this.props.mask) return;

        var key = event.key;
        var hasHandler = typeof this.props.onKeyPress === "function";
        if (key === "Enter" || event.ctrlKey || event.metaKey) {
            if (hasHandler) {
                this.props.onKeyPress(event);
            }
            return;
        }

        var caretPos = this.getCaretPos();
        var selection = this.getSelection();
        var value = this.state.value;
        var mask = this.mask;

        var maskLen = mask.length;
        var prefixLen = this.getPrefix().length;

        if (this.isPermanentChar(caretPos) && mask[caretPos] === key) {
            value = this.insertRawSubstr(value, key, caretPos);
            ++caretPos;
        } else {
            var editablePos = this.getRightEditablePos(caretPos);
            if (editablePos !== null && this.isAllowedChar(key, editablePos)) {
                value = this.clearRange(value, selection.start, selection.length);
                value = this.insertRawSubstr(value, key, editablePos);
                caretPos = editablePos + 1;
            }
        }

        if (value !== this.state.value) {
            event.target.value = value;
            this.setState({
                value: value
            });
            if (typeof this.props.onChange === "function") {
                this.props.onChange(event);
            }
        }
        event.preventDefault();
        if (caretPos < maskLen && caretPos > prefixLen) {
            caretPos = this.getRightEditablePos(caretPos);
        }
        this.setCaretPos(caretPos);
    }

    onFocus(event) {

        if(!this.props.mask) return;

        if (!this.state.value) {
            var prefix = this.getPrefix();
            var value = this.formatValue(prefix);
            event.target.value = this.formatValue(value);
            this.setState({
                value: value
            }, this.setCaretToEnd);

            if (typeof this.props.onChange === "function") {
                this.props.onChange(event);
            }
        } else if (this.getFilledLength() < this.mask.length) {
            this.setCaretToEnd();
        }

    }

    onBlur(event) {

        if(!this.props.mask) return;

        if (this.isEmpty(this.state.value)) {
            this.setState({
                value: ""
            });
        }
    }

    onPaste (event) {

        if(!this.props.mask) return;

        var text;
        if (window.clipboardData && window.clipboardData.getData) {
            // IE
            text = window.clipboardData.getData("Text");
        } else if (event.clipboardData && event.clipboardData.getData) {
            text = event.clipboardData.getData("text/plain");
        }
        if (text) {
            var value = this.state.value;
            var selection = this.getSelection();
            this.pasteText(value, text, selection, event);
        }
        event.preventDefault();
    }

}

// TODO pattern, regexp
if (_DEVELOPMENT_) {
    Input.propTypes = {}
}

export default ColHelper(Input)