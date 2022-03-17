import os
from tinytag import TinyTag
import mysql.connector


directory = "C:/Users/maxle/Desktop/audioPlayer/audio-player/_musicTest"

config = {"user": 'xxxxxxx',
          "password": 'xxxxxxxxx',
          "host": 'xxxxxxx',
          "database": 'xxxxxxxx'}

cnx = mysql.connector.connect(config)


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
        cursor = cnx.cursor()
        cursor.execute(f"""EXISTS(SELECT 1 FROM albums WHERE title = '{tag.album}'""")
    finally:
        cnx.close()    


    song = {
        "title": tag.title,
        "album": tag.album,
        "RP_streaming_path": f"/{file}",
        "title_route": songRoute,
        "track_no": tag.track,
        "album_track_no": tag.track_total,
        "duration": tag.duration,
        "liked": 0,
    }
    
