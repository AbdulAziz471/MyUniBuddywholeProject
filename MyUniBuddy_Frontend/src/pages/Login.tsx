import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { User, GraduationCap, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();


 

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto p-4 flex  items-center justify-center h-screen gap-[100px] ">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            CHEM MENTORIA
          </h1>
          <p className="text-xl text-muted-foreground">
            Access your dashboard
          </p>
        </div>
        
        <div className="">
          <LoginForm 
            
          />
        </div>
      </div>
    </div>
  );
};

export default Login;