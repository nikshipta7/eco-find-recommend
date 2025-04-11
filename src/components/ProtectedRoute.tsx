
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
      toast({
        title: "Access denied",
        description: "Please log in to view this page",
        variant: "destructive",
      });
      
      navigate('/login');
    }
  }, [navigate, toast]);

  return <>{children}</>;
};

export default ProtectedRoute;
