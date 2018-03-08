actions=( 'findOne' 'findMany' 'findById' 'findByIds' )
rm -rf dist;
for var in "${actions[@]}"
do
  echo "${var}"
  babel --out-file "${var}".js app/actions/"${var}".js
done
babel --out-dir dist app
