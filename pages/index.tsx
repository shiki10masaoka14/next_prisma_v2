import Link from "next/link";
import { memo, VFC } from "react";

const Login: VFC = memo(() => {
  return (
    <>
      <Link href={"/practice"}>practice</Link>
    </>
  );
});
Login.displayName = "Login";

export default Login;
