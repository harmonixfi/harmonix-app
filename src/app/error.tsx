'use client';

function ErrorPage() {
  return (
    <>
      <div className="text-center my-20">
        <div>
          <h1 className="text-5xl lg:text-7xl font-semibold uppercase">500 Server Error</h1>
          <p className="text-base lg:text-xl mt-8 mb-1">Oops, something went wrong.</p>
          <p className="text-base lg:text-xl">
            Try to refresh this page or feel free to contact us if the problem persists.
          </p>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
