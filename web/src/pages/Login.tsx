import { useAtom } from "jotai";
import { useEffect } from "react";
import logo from "../assets/logo_color.png";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { loginActionAtom } from "../lib/atoms";

const Login = () => {
  const [loginAction] = useAtom(loginActionAtom);
  const isLogged = localStorage.getItem("token");
  useEffect(() => {
    if (isLogged) {
      window.location.href = "/users";
    }
  }, [isLogged]);
  return (
    <div className="justify-ve flex h-screen w-screen flex-col items-center gap-20 bg-main-pattern bg-cover p-8 md:flex-row md:p-20">
      <section className="flex h-full flex-1 flex-col justify-around gap-8">
        <img src={logo} alt="logo" width={"200px"} className="" />

        <div>
          <h1 className="text-4xl font-bold leading-tight">Bem vindo!</h1>
          <p className="text-xl font-semibold leading-tight">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
          <p className="mt-6 leading-normal">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nulla
            Accumsan, Nisl Sit Amet Porttitor Porta, Nisi Tellus Tempus Ligula,
            Sit Amet Porttitor Porta, Nisi Tellus Tempus Ligula, Sit Amet
            Porttitor Porta, Nisi Tellus Tempus Ligula, Sit Amet Porttitor
            Porta,
          </p>
        </div>

        <div className="italic text-primary">
          <span>
            Desenvolvido com ❤️ por{" "}
            <a
              href="https://rafaeldev.me"
              className="underline hover:text-secondary"
              target="_blank"
              rel="noreferrer noopener"
            >
              @rafaelsilva81
            </a>
          </span>
        </div>
      </section>

      <section className="flex h-full w-96 flex-col justify-center rounded-md bg-gray-800 p-8">
        {loginAction === "login" ? <LoginForm /> : <RegisterForm />}
      </section>
    </div>
  );
};

export default Login;
