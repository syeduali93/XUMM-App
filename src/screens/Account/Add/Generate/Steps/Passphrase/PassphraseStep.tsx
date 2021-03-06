/**
 * Generate Account/Passphrase Screen
 */

import React, { Component } from 'react';
import { SafeAreaView, View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';

// components
import { Button, PasswordInput, Footer } from '@components';

// locale
import Localize from '@locale';

import { GenerateSteps, AccountObject } from '@screens/Account/Add/Generate';

// style
import { AppStyles } from '@theme';
// import styles from './styles';

/* types ==================================================================== */
export interface Props {
    account: AccountObject;
    goBack: (step?: GenerateSteps, settings?: any) => void;
    goNext: (step?: GenerateSteps, settings?: any) => void;
}

export interface State {
    passphrase: {
        value: string;
        isValid: boolean;
    };
    passphrase_confirmation: string;
}

/* Component ==================================================================== */
class PassphraseStep extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            passphrase: {
                value: '',
                isValid: false,
            },
            passphrase_confirmation: '',
        };
    }

    goNext = () => {
        const { passphrase, passphrase_confirmation } = this.state;
        const { goNext } = this.props;

        if (passphrase.value !== passphrase_confirmation) {
            Alert.alert(Localize.t('global.error'), Localize.t('account.passphraseConfirmNotMatch'));
            return;
        }

        if (passphrase) {
            goNext('LabelStep', { passphrase: passphrase.value });
        } else {
            Alert.alert(Localize.t('global.error'), Localize.t('account.enterValidPassphrase'));
        }
    };

    render() {
        const { goBack } = this.props;
        const { passphrase } = this.state;
        return (
            <SafeAreaView testID="account-generate-finish-view" style={[AppStyles.container]}>
                <Text
                    style={[AppStyles.p, AppStyles.bold, AppStyles.textCenterAligned, AppStyles.paddingHorizontalSml]}
                >
                    {Localize.t('account.pleaseEnterSafePassphrase')}
                </Text>

                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
                    style={[AppStyles.flex1, AppStyles.centerContent, AppStyles.paddingSml]}
                >
                    <PasswordInput
                        editable
                        placeholder={Localize.t('account.enterPassphrase')}
                        minLength={8}
                        onChange={(value: string, isValid: boolean) => {
                            this.setState({ passphrase: { value, isValid } });
                        }}
                        validate
                        autoFocus
                    />

                    <PasswordInput
                        editable={passphrase.isValid}
                        selectTextOnFocus={passphrase.isValid}
                        placeholder={Localize.t('account.repeatPassphrase')}
                        onChange={passphrase_confirmation => this.setState({ passphrase_confirmation })}
                        validate={false}
                    />
                </KeyboardAvoidingView>

                <Footer style={[AppStyles.row, AppStyles.centerAligned]}>
                    <View style={[AppStyles.flex3, AppStyles.paddingRightSml]}>
                        <Button
                            label={Localize.t('global.back')}
                            icon="IconChevronLeft"
                            onPress={() => {
                                goBack();
                            }}
                            secondary
                        />
                    </View>
                    <View style={[AppStyles.flex5]}>
                        <Button
                            isDisabled={!passphrase.isValid}
                            textStyle={AppStyles.strong}
                            label={Localize.t('global.next')}
                            onPress={() => {
                                this.goNext();
                            }}
                        />
                    </View>
                </Footer>
            </SafeAreaView>
        );
    }
}

/* Export Component ==================================================================== */
export default PassphraseStep;
