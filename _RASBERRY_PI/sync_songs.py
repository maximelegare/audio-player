import os
from tinytag import TinyTag
import mysql.connector
from mysql.connector.constants import ClientFlag

directory = "C:/Users/maxle/Desktop/audioPlayer/audio-player/public/assets/audio"


# Create URL route
def createUrlRoute(values):
  route = []
  for key in values:
      lowercase = key.lower()
      route.append(lowercase.replace(" ", "-"))
        
  return (f"""/{"/".join(route)}""")     
        

try:
    # MUST pass keywords as arguments, NOT AN OBJECT
    cnx = mysql.connector.connect(
            host="",
            user="",
            password="",
            database="",
            ssl_ca="",
            client_flags=[ClientFlag.SSL]
            )   
    
except Exception as e:
    print("failled to connect to db")
    
    
  
for file in os.listdir(directory):
    filename = os.fsdecode(file)
    filepath = f"{directory}/{filename}"
    tag = TinyTag.get(filepath, image=True)
    # Route for the app
    songRoute = f"/{tag.artist}/{tag.album}/{tag.title}"
    # Song name for the file &
    songName = f"{tag.artist} - {tag.album} - {tag.title}"
    albumName = f"{tag.artist} - {tag.album}"
    
    song_route = createUrlRoute([tag.artist, tag.album, tag.title])
    album_route = createUrlRoute([tag.artist, tag.album])
    artist_route = createUrlRoute([tag.artist])
    
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
                
                # Create album data & insert it
                album_data = (tag.album, album_route, None, tag.year, tag.artist, artist_route) 
                stmt_insert_album = ("INSERT INTO albums" 
                    "(title, title_route, picture_url, year, artist, artist_route)" 
                    "VALUES (%s, %s, %s, %s, %s, %s)")

                curB.execute(stmt_insert_album, album_data)
            
            cnx.commit() 
    except Exception as e:
        print(e)    

cnx.close()    
        
        
        


        
