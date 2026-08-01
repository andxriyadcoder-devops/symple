import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="mt-2 mb-8 text-center text-slate-400">
          Sign in to your Symple account
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;