import { headers } from 'next/headers';
import Info from "./Info";

const ConditionalFooter = () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  
  const skipHeaderRoutes = ["/login", "/register", "/update-password", "/forgot-password", "/verify-OTP"];
  
  if (skipHeaderRoutes.includes(pathname)) {
    return null;
  }
  
  return (
    <>
      <Info />
    </>
  );
};

export default ConditionalFooter;