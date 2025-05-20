import os
def combine_files(file_list, output_file):
    try:
        with open(output_file, 'w') as outfile:
            for filepath in file_list:
                if os.path.isfile(filepath):
                    with open(filepath, 'r') as infile:
                        outfile.write(f"File name: {os.path.basename(filepath)} \n{infile.read()} \n\n")
        print(f"Combined files into {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    file_list = [
        "/Users/jack/Desktop/Projects/Charm2D/inputs/keyhandler.js",
        "/Users/jack/Desktop/Projects/Charm2D/inputs/mousehandler.js",
        "/Users/jack/Desktop/Projects/Charm2D/settings/settings.js",
        "/Users/jack/Desktop/Projects/Charm2D/sprites/artifact.js",
        "/Users/jack/Desktop/Projects/Charm2D/sprites/creature.js",
        "/Users/jack/Desktop/Projects/Charm2D/sprites/hitbox.js",
        "/Users/jack/Desktop/Projects/Charm2D/sprites/myobject.js",
        "/Users/jack/Desktop/Projects/Charm2D/sprites/player.js",
        "/Users/jack/Desktop/Projects/Charm2D/sprites/weapon.js",
        "/Users/jack/Desktop/Projects/Charm2D/world/level.js",
        "/Users/jack/Desktop/Projects/Charm2D/world/layer.js",
        "/Users/jack/Desktop/Projects/Charm2D/sketch.js",
    ]
    output_filename = "python_scripts/combined_output.txt"  # Replace with your desired output file name
    combine_files(file_list, output_filename)
