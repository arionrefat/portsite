import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body style={{fontFamily:'var(--font-geist-sans, system-ui)',background:'var(--background)',color:'var(--foreground)',display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontSize:32,marginBottom:16}}>404</h1>
          <p style={{fontSize:14,opacity:.7}}>Page not found.</p>
          <Link href="/" style={{display:'inline-block',marginTop:24,fontSize:12,color:'var(--accent)'}}>Go home →</Link>
        </div>
      </body>
    </html>
  );
}
