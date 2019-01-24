{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "connector-job.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "connector-job.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "connector-job.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "magda.connectorJobSpec" }}
spec:
  template:
    metadata:
      name: connector-{{ .jobConfig.name }}
    spec:
      containers:
        - name: connector-{{ .jobConfig.id }}
          image: "{{ .jobConfig.image.repository | default .root.Values.image.repository | default .root.Values.global.image.repository }}/{{ .jobConfig.image.name }}:{{ .jobConfig.image.tag | default .root.Values.image.tag | default .root.Values.global.image.tag }}"
          imagePullPolicy: {{ .jobConfig.image.pullPolicy | default .root.Values.image.pullPolicy | default .root.Values.global.image.pullPolicy }}
          command:
            - "node"
            - "/usr/src/app/component/dist/index.js"
            - "--config"
            - "/etc/config/connector.json"
            - "--registryUrl"
            - "http://registry-api/v0"
          resources:
{{ .jobConfig.resources | default .root.Values.resources | toYaml | indent 12 }}
          volumeMounts:
            - mountPath: /etc/config
              name: config
          env: 
            - name: USER_ID
              value: 00000000-0000-4000-8000-000000000000
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: auth-secrets
                  key: jwt-secret
      restartPolicy: "OnFailure"
      volumes:
        - name: config
          configMap:
            name: "adhoc-connector-job-config"
            items:
              - key: "{{ .jobConfig.id }}.json"
                path: "connector.json"
{{- end }}