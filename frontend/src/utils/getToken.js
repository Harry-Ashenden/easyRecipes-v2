export const getToken = () => {
    const token = localStorage.getItem("supabaseToken") || sessionStorage.getItem("supabaseToken");
    return token;
  };
  