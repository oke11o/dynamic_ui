import { Paper, TextField, RaisedButton } from 'material-ui'
import './styles.scss'

const LABEL_TEXT_LOGIN         = config.auth.form_view.labelTextLogin || "Login";
const LABEL_TEXT_PASSWORD      = config.auth.form_view.labelTextPassword || "Password";
const LABEL_TEXT_SUBMIT_BUTTON = config.auth.form_view.labelSubmitButton || "sign in";


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