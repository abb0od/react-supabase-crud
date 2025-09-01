import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../Services/authService";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingOverlay from "./LoadingOverlay";
import { supabase } from "../supabaseClient";


export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



 
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        // Redirect logged-in users to /todos
        navigate("/todos", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  const handleSignUp = async () => {
    try {
      setLoading(true);        
      await signUp({ email, password });
      navigate("/todos");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);        

  };


  const handleSignIn = async () => {
    try {
      setLoading(true);        
      await signIn({ email, password });
      navigate("/todos");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);        
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
            <LoadingOverlay show={loading} />
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Welcome</h3>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary w-45" onClick={handleSignUp} disabled={!email || !password}>
            Sign Up
          </button>
          <button className="btn btn-success w-45" onClick={handleSignIn} disabled={!email || !password}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
