const Login = ({ switchToRegister }) => {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" placeholder="Enter Email" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" placeholder="Enter Password" required />
      </div>

      <button type="submit" className="btn btn-primary w-100">LOGIN</button>

      <p className="text-center mt-3">
        <a href="">Forgot your password?</a>
      </p>

      <p className="text-center mt-3">
        New to Clothes Store?{" "}
        <a href="#" onClick={switchToRegister}>Register</a>
      </p>
    </form>
  );
};

export default Login;
