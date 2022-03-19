import os
from tinytag import TinyTag
import mysql.connector
from mysql.connector.constants import ClientFlag


directory = "C:/Users/maxle/Desktop/audioPlayer/audio-player/testfiles"


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
    # Checks if the album exists in Album table
    
    try:
        cur = cnx.cursor()
        cur.execute(f"""SELECT 1 FROM albums WHERE title = '{tag.album}';""")
        albumRow = cur.fetchone()
        
        # if album does not exist, add it to album table
        if albumRow == None:
            cur.execute("")
           
            
            
            
    except Exception as e:
        print(e)    
    # song = {
    #     "title": tag.title,
    #     "album": tag.album,
    #     "RP_streaming_path": f"/{file}",
    #     "title_route": songRoute,
    #     "track_no": tag.track,
    #     "album_track_no": tag.track_total,
    #     "duration": tag.duration,
    #     "liked": 0,
    # }
        
