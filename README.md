# Magda Knowledge Network Config

This is a simple guide that allows you to quickly set up a Knowledge Network instance. 

# Overview

Knowledge Network application has been packaged as [Helm Charts](https://docs.helm.sh/developing_charts/) and its structure is:
- `kn` Chart ([deploy/charts/kn](deploy/charts/kn)): Knowledge Network Application top level helm chart. You can deploy a Knowledge Network instance using this chart and config it via a `values` file. (e.g. [deploy/minikube.yaml](deploy/minikube.yaml))
  - [magda](https://github.com/magda-io/magda): `kn` chart's dependency. We use `magda`'s published version helm chart at: https://charts.magda.io
  - `test-chart` Chart ([deploy/charts/test-chart](deploy/charts/test-chart)): `kn` chart's dependency. A demo nginx to show-case how you include extra component / chart with `magda`.

For details, please check `kn` chart's dependency declaration file: [deploy/charts/kn/requirements.yaml](deploy/charts/kn/requirements.yaml)

# Getting Started

Before you start you need to get a Kubernetes cluster. If you just want to give this a try locally, you can use [Docker for Desktop](https://www.docker.com/products/docker-desktop) on MacOS or Windows, or [Minikube](https://kubernetes.io/docs/setup/minikube/) on Linux. Either way make sure the VM has at least 2 CPUs and 4gb of RAM. Alternatively you can run this in the cloud - we use [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/).

1.  Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/), [helm](https://docs.helm.sh/using_helm/).

2.  Fork this repository - this means you can make your own customisations, but still pull in updates.

3.  `git clone` it to your local machine open a terminal in the directory

## For New Cluster (Applied to both Google Cloud & Minikube)

1.  Make sure your `kubectl` is connected to your kubernetes cluster and install helm

This will setup a service account for tiler with correct permission.

```bash
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
```

2.  Run the create secrets script in a command line and follow the prompts

```bash
    ./create-secrets/index-linux
    # OR
    ./create-secrets/index-macos
    # OR
    create-secrets\index.win.exe
```

Output should look something like so:

```
magda-create-secrets tool
? Are you creating k8s secrets for google cloud or local testing cluster? Local Testing Kubernetes Cluster
? Which local k8s cluster environment you are going to connect to? docker
? Do you need to access SMTP service for sending data request email? YES
? Please provide SMTP service username: abc
? Please provide SMTP service password: def
? Do you want to create google-client-secret for oAuth SSO? NO
? Do you want to create facebook-client-secret for oAuth SSO? NO
? Do you want to manually input the password used for databases? Generated password: up3Saeshusoequoo
? Specify a namespace or leave blank and override by env variable later? YES (Specify a namespace)
? What's the namespace you want to create secrets into (input `default` if you want to use the `default` namespace)? default
? Do you want to allow environment variables (see --help for full list) to override current settings at runtime? YES (Any environment variable can ove
ride my settings)
? Do you want to connect to kubernetes cluster to create secrets now? YES (Create Secrets in Cluster now)
Successfully created secret `smtp-secret` in namespace `default`.
Successfully created secret `db-passwords` in namespace `default`.
Successfully created secret `auth-secrets` in namespace `default`.
All required secrets have been successfully created!
```

3.  Add the magda chart repo to helm

```bash
helm repo add magda-io https://charts.magda.io
helm repo update
```

4.  For `minikube` or any local dev cluster only

Install local docker registry & registry proxy:

-   Added Relevant Helm Chart Repo

```bash
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm repo update
```

-   Install

```bash
helm install --name docker-registry -f deploy/docker-registry/docker-registry.yml stable/docker-registry
helm install --name kube-registry-proxy -f deploy/docker-registry/kube-registry-proxy.yml incubator/kube-registry-proxy
```

## Deploy to Minikube

1.  Build KN version Gateway & web-server

Go to project root, and then:

```bash
# install all dependencies
yarn install
# build all modules
yarn build
# Set docker ENV variables for your current terminal
eval $(minikube docker-env)
# build docker images (using minikube docker daemon) 
# & push into the local docker registry in minikube cluster
yarn docker-build-local
```

2.  Install Knowledge Network instance

```bash
helm upgrade magda-kn deploy/charts/kn --wait --namespace kn --timeout 30000 --install -f deploy/minikube.yaml --devel
```

This will take a while for it to get everything set up. If you want to watch progress, run `kubectl get pods -w` in another terminal.

If you want to turn on / off a component, just edit the `tags` section in [deploy/minikube.yaml](deploy/minikube.yaml) and re-deploy using the `helm upgrade` command above again.


3. Access Knowledge Network instance

- Access Knowledge Network instance:

By default, the gateway service is exposed via `NodePort` for local deployed instance. You can access via:

`http://192.168.99.100:30100`

You should see `Knowledge Network` web UI once access the URL above.

- Access `test-chart` demo `nginx` service:

By default, the `test-chart` demo `nginx` service is exposed via `NodePort` for local deployed instance. You can access via:

`http://192.168.99.100:30888`

You should see the followings on the page:

```html
This is a KN test-chart!
```

## Deploy to Staging Site / Google Cloud

To be continue...
