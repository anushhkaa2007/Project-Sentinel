from fastapi import FastAPI


def create_app() -> FastAPI:
    app = FastAPI()

    @app.get("/api/health")
    def health():
        return {"status": "ok", "service": "sentinel-backend"}

    return app


app = create_app()
