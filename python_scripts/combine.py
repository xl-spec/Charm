import os
def combine_files(file_list, output_file):
    try:
        with open(output_file, 'w') as outfile:
            for filepath in file_list:
                if os.path.isfile(filepath):
                    with open(filepath, 'r') as infile:
                        outfile.write(infile.read() + '\n\n')  # Add newline for separation
        print(f"Combined files into {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    file_list = [
        "/Users/jack/Desktop/Projects/Charm/collider.js"
        "/Users/jack/Desktop/Projects/Charm/hitbox.js"
        "/Users/jack/Desktop/Projects/Charm/keyhandler.js",
        "/Users/jack/Desktop/Projects/Charm/level.js",
        "/Users/jack/Desktop/Projects/Charm/mousehandler.js",
        "/Users/jack/Desktop/Projects/Charm/settings.js",
        "/Users/jack/Desktop/Projects/Charm/sketch.js",
        "/Users/jack/Desktop/Projects/Charm/sprite/artifact.js",
        "/Users/jack/Desktop/Projects/Charm/sprite/creature.js",
        "/Users/jack/Desktop/Projects/Charm/sprite/myObject.js",
        "/Users/jack/Desktop/Projects/Charm/sprite/player.js",
        "/Users/jack/Desktop/Projects/Charm/weapon.js"
    ]
    output_filename = "python_scripts/combined_output.txt"  # Replace with your desired output file name
    combine_files(file_list, output_filename)
