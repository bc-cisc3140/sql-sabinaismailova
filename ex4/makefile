default:
	node server.js

setup-db:
	sqlite3 billboard.db -cmd '.mode csv' -cmd '.import --csv ../ex1/billboardtop100.csv top100'
