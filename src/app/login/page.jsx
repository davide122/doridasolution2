import LoginForm from "../components/loginform";

export default function LoginPage() {
  return (
    <main className="d-flex align-items-center justify-content-center vh-100">
      <div className="position-relative mx-auto d-flex flex-column w-100" style={{ maxWidth: '400px' }} p-4>
        <div className="d-flex align-items-end justify-content-center bg-primary rounded p-3" style={{ height: '120px' }}>
          <div className="text-white" style={{ width: '144px' }}></div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
