import { SrvRecord } from "dns";
import { generateOtpCode } from "./core/utils/generate_OTP_code";
import { sendMail } from "./core/utils/send_mail";
import { UsersModule } from "./module/users.module";

console.log('--> In Testing...');
console.log('');

async function verifyCode(email: string) {
    let select = await UsersModule.selectByEmail(email);
    if (select.success == false) {
        console.log("Server has Error Sorry try later");
        return;
    }
    if(select.data[0] == undefined){
        console.log("Email not find please don't play with us");
        return;
    }
    const expectedCode = select.data[0]["user_verifycode"];
    console.log(expectedCode);
}

async function mainRun() {

    // const r = await sendMail({
    //     to: "yalavex@gmail.com",
    //     subject: "Test sendMail() function ",
    //     text: "send message successfuly",
    // });
    // console.log(r);

    // const otpCode = generateOtpCode();
    // console.log(otpCode);

    verifyCode("yalavex@gmail.com")




}

mainRun();