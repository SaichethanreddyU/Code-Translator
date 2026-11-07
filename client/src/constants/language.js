const LANGUAGES = [
    {id: 'python', name: 'Python'},
    {id: 'javascript', name: 'JavaScript'},
    {id: 'java', name: 'Java'},
    {id: 'cpp', name: 'C++'},
    {id: 'c', name: 'C'},
    {id: 'csharp', name: 'C#'},
]

//maps our languages to monaco editor language identifiers
const MONACO_LANGUAGES = {
    'python': 'python',
    'javascript': 'javascript',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'csharp': 'csharp'
};

//started code for each language
const STARTER_CODE = {
     'python': `def main(): print("Hello, World!")\n\nif __name__ == "__main__":\n    main()`,
     'javascript': `function main() {\n    console.log("Hello, World!");\n}\n\nmain();`,
     'java': `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,   
     'cpp': `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
     'c': `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
     'csharp': `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}`
};

export {LANGUAGES, MONACO_LANGUAGES, STARTER_CODE};