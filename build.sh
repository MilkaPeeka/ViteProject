# /bin/sh
cd Backend
./build.sh

cd ..
cd Frontend
./build.sh

cd ..

kubectl apply -f vite-project-backend-depl.yaml
kubectl apply -f vite-project-frontend-depl.yaml