# Magda Knowledge Network Config

This is a simple guide that allows you to quickly set up a Knowledge Network instance.

# Overview

Knowledge Network application has been packaged as [Helm Charts](https://docs.helm.sh/developing_charts/) and its structure is:

-   `kn` Chart ([deploy/charts/kn](deploy/charts/kn)): Knowledge Network Application top level helm chart. You can deploy a Knowledge Network instance using this chart and config it via a `values` file. (e.g. [deploy/minikube.yaml](deploy/minikube.yaml))
    -   [magda](https://github.com/magda-io/magda): `kn` chart's dependency. We use `magda`'s published version helm chart at: https://charts.magda.io
    -   `test-chart` Chart ([deploy/charts/test-chart](deploy/charts/test-chart)): `kn` chart's dependency. A demo nginx to show-case how you include extra component / chart with `magda`.

For details, please check `kn` chart's dependency declaration file: [deploy/charts/kn/requirements.yaml](deploy/charts/kn/requirements.yaml)

# Getting Started

Before you start you need to get a Kubernetes cluster.

## For New Cluster (Applied to both Google Cloud & Minikube)

1.  Make sure your `kubectl` is connected to your kubernetes cluster and install helm. See document at [Install kubectl and configure cluster access](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl)

This will setup a service account for tiler with correct permission.

```bash
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
```

2.  Run the create secrets script in a command line and follow the prompts
    The create-secrets tool binary has been removed from the repo due to upstream package software issue.

Please install the NPM package version [here](https://www.npmjs.com/package/@magda/create-secrets).

```bash
npm install --global @magda/create-secrets
```

After the installation you should be able to run `create-secrets` command anywhere from your commandline:

```
$ create-secrets
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
? What's the namespace you want to create secrets into (input `default` if you want to use the `default` namespace)? kn
? Do you want to allow environment variables (see --help for full list) to override current settings at runtime? YES (Any environment variable can ove
ride my settings)
? Do you want to connect to kubernetes cluster to create secrets now? YES (Create Secrets in Cluster now)
Successfully created secret `smtp-secret` in namespace `kn`.
Successfully created secret `db-passwords` in namespace `kn`.
Successfully created secret `auth-secrets` in namespace `kn`.
All required secrets have been successfully created!
```
**Secret used to be found at https://confluence.csiro.au/display/envinformatics/Knowledge+Network+secret+and+note**
**Please note: you can choose any namespace (rather than `kn`) here. But if you use a different namespace. You need to adjust `helm update` command below with correct namespace.**

1.  Add the magda chart repo to helm

```bash
helm repo add magda-io https://charts.magda.io
helm repo update
```

If you want to turn on the [test-chart](deploy/charts/test-chart) (it's a helm chart to demo extending KN deployment with extra backend APIs), you will need to add `bitnami` helm charts repo as well:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

4.  Update KN chart dependencies

```bash
helm dep up deploy/charts/kn
```

This commandline will download (if it's a remote chart) / copy (if it's a local file system chart) all dependencies required for KN chart and make them available for `kn` chart deployment at directory `deploy/charts/kn/charts/`.

You will need to re-run this commmand after modified the content of `test-chart` chart (deploy/charts/test-chart).

Don't worry if you see something like:

```
...Unable to get an update from the "local" chart repository (http://localhost:8879/charts):
        Get http://localhost:8879/charts/index.yaml: dial tcp [::1]:8879: connect: connection refused
```

The `localhost` charts repo is a default local test repo server comes with your helm installation. It's for testing your local chart repo. More details see [here](https://docs.helm.sh/helm/#helm-serve).

## Deploy to Google Cloud: Test Staging Site

This section provides the instruction for deploying a `test` staging site.

The `test` staging site will operate over HTTP (rather than HTTPS) and behind the domains `staging-test.knowledgenet.co` & `staging-test-es.knowledgenet.co` (you need to modify your local `hosts` file to access the domain).

This type of deployment is for testing a KN vevsion when you:

-   Can't add a domain DNS record for your test sub-domain
-   Can't generate a certificate for your test sub-domain

If the two points above are not a problem for you, you can simply setup a `HTTPS` instance by providing correct `global.tlssecret` value (name of the certifcate secret) when you deploy via `helm`.

### Build & Push Docker Image to GKE registry

In order to push images to GKE registry, you need to authenticate to the Container Registry. Here, we will provide two options:

-   Use Docker credential helper
    -   This method is more for pushing image from your local computer. You only need to setup once.
-   Using a JSON key file
    -   This method is more appropriate for a CI environment.

#### Use Docker credential helper

##### 1. Make sure your `docker` client is newer than 18.03 or above.

A bug in earlier versions of the Docker client slows down docker builds dramatically when credential helpers are configured.

You can check your docker client version by:

```bash
docker --version
```

##### 2. Upgrade your `gcloud` toolkit to the latest version.

```bash
gcloud components update
```

You may need admin privilege to run this command.

##### 3. Make sure `docker-credential-gcr` is installed with your `gcloud` toolkit by list all components with version:

```bash
gcloud components list
```

If it's not installed, install it via:

```bash
gcloud components install docker-credential-gcr
```

You may need admin privilege to run this command.

##### 4. Configure docker to authenticate using credential helpers

**You will only need to run this once:**

```bash
gcloud auth configure-docker
```

This command will make docker authenticate using credential helpers for hosts:

-   gcr.io
-   us.gcr.io
-   eu.gcr.io
-   asia.gcr.io
-   staging-k8s.gcr.io
-   marketplace.gcr.io

##### 5. Build & Push images

Go to the project root, and run:

```bash
yarn build
```

to build all modules if you haven't done so.

And then:

```bash
yarn docker-build-staging
```

This will push images to staging repository `gcr.io/knowledge-network-192205/staging/magda/[module name]:[Vesion Tag]`.

You also can run:

```bash
yarn docker-build-prod
```

to push images to prod repository `gcr.io/knowledge-network-prod/data61/[module name]:[Vesion Tag]`.

If you see an error like `Failed to dial gRPC: cannot connect to the Docker daemon.` when run `yarn docker-build-staging` or `yarn docker-build-prod`, please make sure you have `Docker daemon` running because these two scripts don't use `Docker daemon` comes with `minikube`.

You can download & install the [Docker Desktop](https://www.docker.com/products/docker-desktop) to have a `Docker daemon` running locally.

#### Using a JSON key file

Create a service account that has access to the GKE registry and download the service account JSON key file.

You can login to the registry in your CI via:

```bash
cat keyfile.json | docker login -u _json_key --password-stdin https://[HOSTNAME]
```

where [HOSTNAME] is `gcr.io`, `us.gcr.io`, `eu.gcr.io`, or `asia.gcr.io`.

### Deploy to GKE

#### Create your namespace for deployment (for new deployment)

You can create a new namespace (e.g. test-kn-chart) for your deployment:

```bash
kubectl create namespace test-kn-chart
```

#### Create Secrets

Run the create secrets script in a command line and follow the prompts

```bash
create-secrets
```

#### Deploy using helm

Go to project root and run:

#### 1. Update KN chart dependencies:

```bash
helm dep up deploy/charts/kn
```

##### 2. Deploy

```bash
helm upgrade magda-kn-test-deployment deploy/charts/kn --wait --namespace test-kn-chart --timeout 30000 --install -f deploy/staging.yaml --devel
```

Where `magda-kn-test-deployment` is the helm release name and `test-kn-chart` is the namespace name.

This will setup a HTTP instance. If you want to deploy a proper HTTPS instance, you need to supply the domain certificate secret name (and desired domains) to helm:

```bash
helm upgrade magda-kn-test-deployment deploy/charts/kn --wait --namespace test-kn-chart --timeout 30000 --install -f deploy/staging.yaml --devel --set global.tlssecret=[certificate secret name] --set global.externalUrlkn=[kn domain name] --set global.externalUrlEs=[kn es domain name]
```

Where:

-   [certificate secret name] is the domain certificate secret name. Default value is empty (If it's empty, instance will be operated over HTTP).
-   [kn domain name] is the kn instance access domain name. Default value is `staging-test.knowledgenet.co`
-   [kn es domain name] is the kn instance elasticsearch access domain name. Default value is `staging-test-es.knowledgenet.co`

### Access the test Staging site

As the test staging site was deployed without the domain certificate ( and assume you can't add a domain DNS record for your sub domain), you need extra steps to access your `test` staging site locally.

#### 1. Add domain to your local `hosts` file

You need to add domains `staging-test.knowledgenet.co` & `staging-test-es.knowledgenet.co` to your local `hosts` file (so that those domains can be resolved properly on your local computer):

```
35.201.0.106 staging-test.knowledgenet.co
35.201.0.106 staging-test-es.knowledgenet.co
```

Where, `35.201.0.106` is the Nginx ingress controller IP.

The `hosts` file is located at:

-   On Macos / linux: `/etc/hosts`
-   On Windows:
    -   Copy `c:\Windows\System32\Drivers\etc\hosts` to Your Desktop (To avoid the access trouble when you try direct access it)
    -   Edit the copy on your desktop
    -   Copy it back to `c:\Windows\System32\Drivers\etc\hosts`

#### 2. Access using google chrome

If use google chrome, please use incognito window /tab to access the URL to avoid being redirected to HTTPS url (which is not available if you did supply certificate secret)

Es search test access URL:
http://staging-test-es.knowledgenet.co/datasets38/_search
https://staging-test-es.knowledgenet.co/regions21/_search
https://staging-test-es.knowledgenet.co/formats1/_search
https://staging-test-es.knowledgenet.co/publishers3/_search

KN test access URL:
http://staging-test.knowledgenet.co

KN demo test chart URL:
http://staging-test.knowledgenet.co/api/v0/test-chart/test-api

# Create adhoc Connector Job in cluster

You can create adhoc connector job with the following:

## 1. Edit deploy/charts/connector-job/values.yaml

You can edit `deploy/charts/connector-v1.0.0-prod/values.yaml` to add / delete connectors to be created.

## 2. Run the following command:

```bash
helm upgrade connector-job deploy/charts/connector-v1.0.0-prod --install --namespace kn
```

This command won't re-create a new job if a job with same name exist. Therefore, you may want to delete the previously complete jobs in order to re-run the connector.
