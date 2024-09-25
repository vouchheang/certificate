import { headers } from 'next/headers';
import Footer from "./Footer";

const ConditionalFooter = () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  
  const skipHeaderRoutes = ["/update-password", "/forgot-password", "/verify-OTP"];
  
  if (skipHeaderRoutes.includes(pathname)) {
    return null;
  }
  
  return (
    <>
      <Footer />
    </>
  );
};

export default ConditionalFooter;