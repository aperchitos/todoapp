declare module "worker-loader*" {
    class TodoWorker extends Worker {
        constructor();
    }

    export = TodoWorker;
}
