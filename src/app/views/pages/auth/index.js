import { Paper, TextField, RaisedButton } from 'material-ui'
import './styles.scss'
import has from 'lodash/object/has'


const LABEL_TEXT_LOGIN = has(config_dui, 'auth.form_view.label_text_login') ?
    config_dui.auth.form_view.label_text_login : "Login";

const LABEL_TEXT_PASSWORD = has(config_dui, 'auth.form_view.label_text_password') ?
    config_dui.auth.form_view.label_text_password : "Password";

const LABEL_TEXT_SUBMIT_BUTTON = has(config_dui, 'auth.form_view.label_submit_button') ?
    config_dui.auth.form_view.label_submit_button : "sign in";



class LoginPage extends React.Component {

    render() {
        return (
            <Paper className="form-wrapper">
                <TextField name="login" type="text" fullWidth
                           floatingLabelText={LABEL_TEXT_LOGIN}/>
                <TextField name="password" type="password" fullWidth
                           floatingLabelText={LABEL_TEXT_PASSWORD}/>
                <div className="form-wrapper__submit">
                    <RaisedButton label={LABEL_TEXT_SUBMIT_BUTTON} secondary type="submit"/>
                </div>
            </Paper>
        )
    }
}

export default LoginPage