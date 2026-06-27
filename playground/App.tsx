import { createSignal } from 'solid-js';
import { Button } from 'solid-component';
import './App.css';

const App = () => {
  const [count, setCount] = createSignal(0);
  const [loading, setLoading] = createSignal(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div class="playground">
      <header class="header">
        <h1>Solid Component Library</h1>
        <p>A playground for developing and previewing components.</p>
      </header>

      <main class="main">
        <section class="section">
          <h2>Button Variants</h2>
          <div class="row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </section>

        <section class="section">
          <h2>Button Sizes</h2>
          <div class="row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section class="section">
          <h2>With Icons</h2>
          <div class="row">
            <Button icon={<span>🚀</span>}>Launch</Button>
            <Button iconRight={<span>→</span>}>Next</Button>
            <Button icon={<span>🔍</span>} iconRight={<span>↵</span>}>
              Search
            </Button>
          </div>
        </section>

        <section class="section">
          <h2>Loading State</h2>
          <div class="row">
            <Button loading>Always Loading</Button>
            <Button loading={loading()} onClick={simulateLoading}>
              Click to Load
            </Button>
          </div>
        </section>

        <section class="section">
          <h2>Interactive Counter</h2>
          <div class="row">
            <Button variant="outline" onClick={() => setCount((c) => c - 1)}>
              −
            </Button>
            <span class="counter">{count()}</span>
            <Button onClick={() => setCount((c) => c + 1)}>+</Button>
          </div>
        </section>

        <section class="section">
          <h2>Full Width</h2>
          <Button fullWidth variant="outline">
            Full-width Button
          </Button>
        </section>

        <section class="section">
          <h2>Disabled</h2>
          <div class="row">
            <Button disabled>Primary Disabled</Button>
            <Button disabled variant="outline">
              Outline Disabled
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
