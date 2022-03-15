import os;
from tinytag import TinyTag

directory = "C:/Users/maxle/Desktop/audioPlayer/audio-player/_musicTest"
    
for file in os.listdir(directory):
     filename = os.fsdecode(file)
     filepath = f"{directory}/{filename}"
     tag = TinyTag.get(filepath)  
     
     route = f"/{tag.artist}/{tag.album}/{tag.title}"
     
     song = {
         "title":tag.title,
         "album":tag.album,
         "RP_streaming_path":f"/{file}",
         "title_route":route,
         "track_no":tag.track,
         "album_track_no":tag.track_total,
         "duration":tag.duration,
         "liked":0,
     }
     print(song)
     
              

     
     