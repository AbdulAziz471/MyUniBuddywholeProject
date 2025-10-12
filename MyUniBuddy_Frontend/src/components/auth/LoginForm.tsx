import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import AuthService from "../../services/AdminServices/AuthService";
import useAuthStore from "../../store/authStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// ──────────────────────────────────────────────────────────────────────────────
// Small utility to compute password strength without extra deps
// Score 0..4. We consider <2 as "weak"
function evaluatePassword(pw: string) {
  const length = pw.length;
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSymbol = /[^\da-zA-Z]/.test(pw);
  let score = 0;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (hasLower && hasUpper) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;
  // clamp 0..4
  score = Math.max(0, Math.min(score, 4));

  const requirements: string[] = [];
  if (length < 8) requirements.push("At least 8 characters");
  if (!(hasLower && hasUpper)) requirements.push("Mix of upper & lower letters");
  if (!hasNumber) requirements.push("At least one number");
  if (!hasSymbol) requirements.push("At least one symbol");

  const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"] as const;
  const percent = [10, 30, 55, 80, 100][score];
  return { score, label: labels[score], percent, requirements };
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Login state
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Signup state (confirmPassword is client-only)
  const [signup, setSignup] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });

  const { toast } = useToast();
  const navigate = useNavigate();
  const zustandLogin = useAuthStore((state) => state.login);
  const zustandLogout = useAuthStore((state) => state.logout);

  const pwdEval = useMemo(() => evaluatePassword(signup.password), [signup.password]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, user } = await AuthService.login(credentials);
      if (token) {
        zustandLogin(token, user, { persistent: false });
        toast({ title: "Login Successful", description: "Welcome to the Admin Panel" });
        if (user.role === "Admin") navigate("/admin/dashboard");
        else if (user.role === "Student") navigate("/student/dashboard");
        else navigate("/");
      } else {
        const msg = "Login failed: No token received.";
        setError(msg);
        toast({ variant: "destructive", title: "Login Failed", description: "No authentication token received from the server." });
        zustandLogout();
      }
    } catch (apiError: any) {
      const errorMessage = apiError?.message || "An unexpected error occurred during login.";
      setError(errorMessage);
      toast({ variant: "destructive", title: "Login Error", description: errorMessage });
      zustandLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side checks
    if (signup.password !== signup.confirmPassword) {
      toast({ variant: "destructive", title: "Passwords don't match", description: "Please retype the password fields." });
      return;
    }

    if (pwdEval.score < 2) {
      toast({
        variant: "destructive",
        title: "Password is weak",
        description: `Improve it: ${pwdEval.requirements.join(", ")}`,
      });
      return;
    }

    setIsLoading(true);
    try {
      // API expects { fullName, email, password }
      const payload = {
        fullName: signup.fullName.trim(),
        email: signup.email.trim(),
        password: signup.password,
      };
      await AuthService.registorUser(payload);
      toast({ title: "Account created", description: "You can now sign in." });
      setIsLogin(true);
      // Prefill email on login tab
      setCredentials({ email: signup.email, password: "" });
      // Clear signup fields except email
      setSignup({ fullName: "", email: signup.email, password: "", confirmPassword: "" });
    } catch (apiError: any) {
      const msg = apiError?.message || "Could not create account.";
      toast({ variant: "destructive", title: "Signup failed", description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Admin Panel</CardTitle>
        <p className="text-muted-foreground">Sign in or create an account</p>
      </CardHeader>
      <CardContent>
        <Tabs value={isLogin ? "login" : "signup"} onValueChange={(value) => setIsLogin(value === "login")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* ───────────── Login Tab ───────────── */}
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="pl-10"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          {/* ───────────── Signup Tab ───────────── */}
          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signup.fullName}
                    onChange={(e) => setSignup((s) => ({ ...s, fullName: e.target.value }))}
                    className="pl-10"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signup.email}
                    onChange={(e) => setSignup((s) => ({ ...s, email: e.target.value }))}
                    className="pl-10"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={signup.password}
                    onChange={(e) => setSignup((s) => ({ ...s, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Strength meter */}
                <div className="mt-1">
                  <div className="h-2 w-full rounded bg-muted">
                    <div
                      className={`h-2 rounded ${pwdEval.percent < 55 ? "bg-red-500" : pwdEval.percent < 80 ? "bg-yellow-500" : "bg-green-500"}`}
                      style={{ width: `${pwdEval.percent}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Strength: {pwdEval.label}</p>
                  {pwdEval.score < 2 && (
                    <ul className="text-xs text-red-500 list-disc pl-5 mt-1">
                      {pwdEval.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={signup.confirmPassword}
                    onChange={(e) => setSignup((s) => ({ ...s, confirmPassword: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                    autoComplete="new-password"
                  />
                </div>
                {signup.confirmPassword && signup.password !== signup.confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match.</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot your password?
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
