## Minio Migration

Setup & run minio mc

    sudo docker run -it --network storage_network --entrypoint=/bin/sh minio/mc
    mc config host add myaws http://s3.ap-southeast-1.amazonaws.com ACCESS_KEY SECRET_KEY
    mc config host add myminio http://minio:9000 ACCESS_KEY SECRET_KEY

Run file migration

    mc cp --recursive myaws/webgeocreate/atrbpn-cbt myminio
