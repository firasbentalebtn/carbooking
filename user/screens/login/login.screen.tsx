import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import styles from "./styles";
import Images from "@/utils/images";
import SignInText from "@/components/login/signin.text";
import { external } from "@/styles/external.style";
import PhoneNumberInput from "@/components/login/phone-number.input";
import Button from "@/components/common/button";
import { router } from "expo-router";
import { Toast, useToast } from "react-native-toast-notifications";
import axios from "axios";
export default function LoginScreen() {
  const [phone_number, setphone_number] = useState("");
  const [countryCode, setCountryCode] = useState("+218");
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const handleSubmit = async () => {
    if (phone_number === "" || countryCode === "") {
      toast.show("Please fill the fields!", {
        placement: "bottom",
      });
    } else {
      console.log(process.env.EXPO_PUBLIC_SERVER_URI);
      const phoneNumber = `+${countryCode}${phone_number}`;
      await axios
        .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/registration`, {
          phone_number: phoneNumber,
        })
        .then((res) => {
        //  console.log(res);
        router.push({
          pathname: "/(routes)/otp-verification",
          params: { phoneNumber },
        });
        })
        .catch((error) => {
          console.log(error);
          toast.show(
            "Something went wrong! please re check your phone number!",
            {
              type: "danger",
              placement: "bottom",
            }
          );
        });
    }
  };
  return (
    <AuthContainer
      topSpace={windowHeight(150)}
      imageShow={true}
      container={
        <View>
          <View>
            <View>
              <Image style={styles.transformLine} source={Images.line} />
              <SignInText />
              <View style={[external.mt_25, external.Pb_10]}>
                <PhoneNumberInput
                  phone_number={phone_number}
                  setphone_number={setphone_number}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />
                <View style={[external.mt_25, external.Pb_15]}>
                  <Button
                    title="Get Your Code"
                    onPress={() => handleSubmit()}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
}
