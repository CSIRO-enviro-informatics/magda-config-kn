## Login Google Cloud

```bash
# auth login
gcloud auth login

#set config if nessary, find these params on GKE
gcloud config set project knowledge-network-prod
gcloud config set compute/zone australia-southeast1-b
gcloud container clusters get-credentials kn-prod-cluster-1 --zone australia-southeast1-b  --project knowledge-network-prod
```

## Create Google Cloud SQL

-   create a postgres db on Google Cloud SQL
-   save default password for later usage of create secrets
-   copy `instance connection name` at OVERVIEW tab of the created DB
-   enable `Private IP` at CONNECTION tab
-   enable `Cloud SQL Admin API` at `https://console.developers.google.com/apis/library/sqladmin.googleapis.com?project=knowledge-network-prod&authuser=1`
-   create or reuse a service accounts at `https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=1&project=knowledge-network-prod`,
-   and assign the `Cloud SQL Admin` Role to the chosen service account
-   Download the JSON format key folowing `Service accounts -> Action -> Create key -> JSON -> Create` at `https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=1&project=knowledge-network-prod`
-   move the downladed json key file to project directory, the create securets tool could find and use it.

## Create securets

```bash
#create tls secret (copy the secret key and crt to local directory)
kubectl create secret tls kn-tls-secret --key=wildcard.knowledgenet.co.unencrypted.key --cert=wildcard.knowledgenet.co-ssl_certificate.crt
```

```
magda-create-secrets tool version: 0.0.52-0
Found previous saved config (April 9th 2019, 2:19:07 pm).
? Do you want to connect to kubernetes cluster to create secrets without going through any questions? NO (Going through all questions)
? Are you creating k8s secrets for google cloud or local testing cluster? Google Cloud Kubernetes Cluster
? Do you use google cloud SQL service as your database? YES
? Please provide default google cloud SQL service DB password: CloudSqlDefaultPassword
? Has located saved Google SQL cloud credentials JSON file. Do you want to re-select? YES
? Please provide the path to the credentials JSON file for your Google SQL cloud service access: C:\Users\wan273\projects\magda-config-kn\knowledge-network-prod-27e47b65b3f8.json
? Do you use google storage service? NO
? Do you need to access SMTP service for sending data request email? NO
? Do you use Gitlab as your CI system and need the access to Gitlab docker registry? NO
? Do you want to create google-client-secret for oAuth SSO? YES
? Please provide google api access key for oAuth SSO: GoogleApiAccessKey
? Do you want to create facebook-client-secret for oAuth SSO? YES
? Please provide facebook api access key for oAuth SSO: FacebookApiAccessKey
? Do you want to create aaf-client-secret for AAF Rapid Connect SSO? YES
? Please provide AAF secret for AAF Rapid Connect SSO: AAFApiAccessKey
? Do you want to setup HTTP Basic authentication? NO
? Do you want to manually input the password used for databases? Generated password: DBpassword
? Specify a namespace or leave blank and override by env variable later? YES (Specify a namespace)
? What's the namespace you want to create secrets into (input `default` if you want to use the `default` namespace)? v2-1
? Do you want to allow environment variables (see --help for full list) to override current settings at runtime? YES (Any environment variable can overide my settings)
? Do you want to connect to kubernetes cluster to create secrets now? YES (Create Secrets in Cluster now)
Successfully created secret `cloudsql-instance-credentials` in namespace `v2-1`.
Successfully created secret `cloudsql-db-credentials` in namespace `v2-1`.
Successfully created secret `db-passwords` in namespace `v2-1`.
Successfully created secret `oauth-secrets` in namespace `v2-1`.
Successfully created secret `auth-secrets` in namespace `v2-1`.
All required secrets have been successfully created!
```

## config/update charts

```bash
#set namespace
kubectl config set-context $(kubectl config current-context) --namespace=$NAMESPACE

#update magda repo
helm repo add magda-io https://charts.magda.io
helm repo update
#update bitnami repo
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
#update kn chart dependencies
helm dep up deploy/charts/kn
```

## installation

```bash
#build code
yarn build
#build docker and push to Google docker regitstry
yarn docker-build-prod
#install / update KN
helm upgrade v2-1 deploy/charts/kn --wait --namespace v2-1 --timeout 3000 --install -f deploy/prod.yaml  --devel
```

## Harvest

```bash
helm upgrade connector-job deploy/charts/connector-job --install --namespace v2-1
```
