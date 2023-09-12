import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {schema} from '../../../utils/validation';
import {colors} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import {loginUser} from '../../../redux/actions/authAction';
import styles from './styles';

class Login extends Component {
  state = {
    email: '',
  };

  onSubmit = () => {
    const {email} = this.state;
    if (!email) {
      Toast.show({
        text1: 'Email address field can`t be empty.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'Please enter a valid email address.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = {
        role: 'user',
        email: 'abc@gmail.com',
        password: '123456',
      };
      this.props.loginUser(payload);
      Toast.show({
        text1: 'Login successful',
        type: 'success',
        visibilityTime: 3000,
      });
    }
  };

  render() {
    const {email, password} = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Login'}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <View style={[styles.container, {marginTop: 10}]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <CustomTextInput
              label
              labeltext={'Email'}
              leftIcon={appIcons.email}
              Lineicon={appIcons.line}
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              placeholder={'Email'}
              value={email}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({email: value})}
              containerStyle={styles.emailinput}
            />

            <CustomButton
              title="Next"
              onPress={this.onSubmit}
              buttonStyle={styles.btn}
              textStyle={styles.btntext}
            />
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {loginUser};
export default connect(null, actions)(Login);
