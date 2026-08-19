import { Header } from './chrome';
import './docs/docs.css';

export default function NotFound() {
  return (
    <>
      <Header />
      <main class="docs">
        <div class="wrap">
          <span class="eyebrow">404</span>
          <h1>Nothing here</h1>
          <p class="lede">
            That page does not exist. Try the <a href="/docs">docs</a>.
          </p>
        </div>
      </main>
    </>
  );
}
