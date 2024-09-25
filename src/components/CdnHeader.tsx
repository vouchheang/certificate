import { headers } from 'next/headers';
import Header from "../components/Header";

const ConditionalHeader = () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  
  const skipHeaderRoutes = ["/login", "/register", "/update-password", "/forgot-password", "/verify-OTP"];
  
  if (skipHeaderRoutes.includes(pathname)) {
    return null;
  }
  
  return <Header />;
};

export default ConditionalHeader;