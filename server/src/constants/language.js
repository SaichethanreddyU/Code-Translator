export const SUPPORTED_LANGUAGES = [
    {id: 'python', name: 'Python'},
    {id: 'javascript', name: 'JavaScript'},
    {id: 'java', name: 'Java'},
    {id: 'cpp', name: 'C++'},
    {id: 'c', name: 'C'},
    {id: 'csharp', name: 'C#'},
]

export const getLanguageName = (languageId) => {
    const language = SUPPORTED_LANGUAGES.find(lang => lang.id === languageId);
    return language ? language.name : null;
}