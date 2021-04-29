
# GCP PubSub Project

# Getting started
==================
Create a service account in GCP,also give the following roles to the service account
Pub/Sub Admin
Pub/Sub Editor
Pub/Sub Publisher
Pub/Sub Subsscriber
Pub/Sub Viewer

# Copy the json secret key for the account created above
==========================================================
An replace it witht the one in credentials

# Enable the following API on the service account Project
==========================================================
Cloud Pub/Sub  API

# You need to create a folder called 'credentials' in the project copy gcp json secret into it
===============================================================================================
Cloud Pub/Sub  API

# To set environment deployment variable i.e db name etc
create a .env  file, then add your detail using key pair i.e Name=value
=======================================================================
List of NameValue for .env 
===================================
GOOGLE_APPLICATION_CREDENTIALS= "./credentials/secrets.json"
PORT = 6000
TIME_OUT = 60

UseRetryPolicy = false
SERVICE_ACCT_NAME ='odm-pubsub-access@ingka-ofd-ordercom-dev.iam.gserviceaccount.com'
SUB_NAME = 'odm-euw3-dev-deviation-alerts'
TOPIC_NAME = 'projects/ingka-ofd-odm-dev/topics/odm-euw3-dev-deviation-alerts'
===================================




