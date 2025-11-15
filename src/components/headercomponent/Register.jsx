const Register = ({ switchToLogin }) => {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input type="text" className="form-control" placeholder="Enter First Name" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input type="text" className="form-control" placeholder="Enter Last Name" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" placeholder="Enter Email" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" placeholder="Enter Password" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input type="password" className="form-control" placeholder="Confirm Password" required />
      </div>

      <button type="submit" className="btn btn-primary w-100">REGISTER</button>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <a href="#" onClick={switchToLogin}>Login</a>
      </p>
    </form>
  );
};

export default Register;
