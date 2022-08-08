from importlib.metadata import metadata
import os
from tinytag import TinyTag
import mysql.connector
from mysql.connector.constants import ClientFlag
import firebase_admin 
from firebase_admin import credentials
from firebase_admin import storage
from uuid import uuid4
from urllib.parse import quote

# Create URL route
def createUrlRoute(values):
  route = []
  for key in values:
      lowercase = key.lower()
      route.append(lowercase.replace(" ", "-"))
        
  return (f"""/{"/".join(route)}""")   


try:
    firebaseProjectID = ""
    cred = credentials.Certificate("/srv/dev-disk-by-uuid-1ff3e8df-731b-496d-be7d-09abcb10dffc/hodei2/sync/firebase-private-key.json")
    firebase_admin.initialize_app(cred, {"storageBucket" : f"{firebaseProjectID}.appspot.com" })
  
except Exception as e:
    print("failed to connect to Firebase :", e)      
  
   
try:
    # MUST pass keywords as arguments, NOT AN OBJECT
    cnx = mysql.connector.connect(
            host="",
            port="",
            user="",
            password="",
            database="",
            # ssl_ca="/srv/dev-disk-by-uuid-5D9F-2A63/hodei/sync/server.crt",
            # client_flags=[ClientFlag.SSL]
            )
    directory = "/srv/dev-disk-by-uuid-5D9F-2A63/hodei/_music"

    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        filepath = f"{directory}/{filename}"
        tag = TinyTag.get(filepath, image=True)
        
        # Route for the app
        songRoute = f"/{tag.artist}/{tag.album}/{tag.title}"
        
        # Song name for the file can 
        songName = f"{tag.artist}-{tag.album}-{tag.title}"
        albumName = f"{tag.artist}-{tag.album}"
        song_route = createUrlRoute([tag.artist, tag.album, tag.title])
        album_route = createUrlRoute([tag.artist, tag.album])
        artist_route = createUrlRoute([tag.artist])
        
        imageBuffer = tag.get_image()

        
        try:
            curA = cnx.cursor(buffered=True)
            curB = cnx.cursor(buffered=True)
            # Checks if the song exists in songs table    
            curA.execute(f"""SELECT 1 FROM songs WHERE title = '{tag.title}';""")    
            songRow = curA.fetchone()
            
            # If song does not exist, add it to songs table
            if songRow == None:
                
                # Create song data & insert it
                song_data = (tag.title, tag.album, tag.duration, song_route, 0, f"/{file}")
                stmt_insert_song = ("INSERT INTO songs" 
                    "(title, album, duration, title_route, liked, RP_streaming_path)" 
                    "VALUES (%s, %s, %s, %s, %s, %s)")    
                curB.execute(stmt_insert_song, song_data)
                # Checks if the album exists in albums table
                curA.execute(f"""SELECT 1 FROM albums WHERE title = '{tag.album}';""")
                albumRow = curA.fetchone()
                
                # if album does not exist, add it to albums table
                if albumRow == None:
                    
                    picture_url = None
                    if imageBuffer:
                        bucket = storage.bucket()
                        blob = bucket.blob(f"{albumName}.jpg")

                        # Generate token for the image to be able to access it from here (create the url)
                        new_token = uuid4()
                        metadata = {"firebaseStorageDownloadTokens": new_token}    

                        blob.metadata = metadata 
                        blob.upload_from_string(
                            imageBuffer,
                            content_type='image/jpg',
                        )    

                        picture_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{quote(albumName)}.jpg?alt=media&token={new_token}"
                    
                    # Create album data & insert it
                    album_data = (tag.album, album_route, picture_url, tag.year, tag.artist, artist_route) 
                    stmt_insert_album = ("INSERT INTO albums" 
                        "(title, title_route, picture_url, year, artist, artist_route)" 
                        "VALUES (%s, %s, %s, %s, %s, %s)")
                    curB.execute(stmt_insert_album, album_data)
                    
                    cnx.commit()
                    
                    
                 
        except Exception as e:
            print(e)    
        
    cnx.close()    
    print("disconnected")     
    
except Exception as e:
    print("failed to connect to db :", e)
    

        
        
