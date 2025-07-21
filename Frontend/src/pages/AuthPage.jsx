import AuthForm from "../components/AuthForm";

const AuthPage = ({ onAuthSuccess }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-green-50">
      <AuthForm onAuthSuccess={onAuthSuccess} />
    </div>
  );
};

export default AuthPage;
