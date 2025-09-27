// client/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '40px', textAlign: 'center' }}>
      <h1>ברוכים הבאים למערכת הניהול המשולבת</h1>
      <p>בחרו את סוג המשימות שתרצו לנהל:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <Link href="/todos" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'black' }}>
          <h2>רשימת משימות (Todo)</h2>
        </Link>
        <Link href="/bugs" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'black' }}>
          <h2>ניהול באגים (BugTracker)</h2>
        </Link>
      </div>
    </main>
  );
}