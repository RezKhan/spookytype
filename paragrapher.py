# little script to format multi-line paragraphs from texts into single line paragraphs and then return the text
import sys

def combine_paragraphs(text):
    # Split the text into paragraphs using double newline characters as a separator
    paragraphs = text.split('\n\n')

    # Join the lines within each paragraph, removing newline characters
    formatted_paragraphs = [' '.join(paragraph.split()) for paragraph in paragraphs]

    # Combine the paragraphs into a single string with double newline characters between them
    combined_text = '\n\n'.join(formatted_paragraphs)

    return combined_text

def replace_in_file(file_path):
    try:
        # Read the whole file
        with open(file_path, 'r') as file:
            file_contents = file.read()

        # Use the combine_paragraphs function to modify the text
        modified_text = combine_paragraphs(file_contents)

        # Write the modified text back to the same file
        with open(file_path, 'w') as file:
            file.write(modified_text)

        print(f"Text in {file_path} has been replaced in-place.")
    except FileNotFoundError:
        print(f"File {file_path} not found. Try paragrapher.py <filepath>")
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    argv = sys.argv
    
    file_path = argv[1]
    replace_in_file(file_path)


if __name__ == '__main__': 
	main()  