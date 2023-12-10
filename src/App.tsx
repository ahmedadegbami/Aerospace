function App() {
  return (
    <>
      <h1 data-testid="main-title">Assignment from Isar Aerospace</h1>
      <nav>
        <ul>
          <li>
            <a data-testid="status-title" href={`./spectrumStatus`}>
              Spectrum Status
            </a>
          </li>
          <li>
            <a data-testid="wb-title" href={`./spectrumWS`}>
              Spectrum Web Socket
            </a>
          </li>
          <li>
            <a data-testid="comment-title" href={`./comments`}>
              Comment for Improvement
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;
