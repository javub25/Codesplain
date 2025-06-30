import {render, screen} from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';

const mockRepository = {
    full_name: 'facebook/react',
    language: 'JavaScript',
    description: 'A js library',
    owner: {
        login: 'facebook',
    },
    name: 'react.js',
    html_url: 'https://github.com/facebook/react'
}

const showRepositoryListItem = () => {
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={mockRepository} />
        </MemoryRouter>
    );
}

const getGithubUrl = () => 
{
    const GithubUrl = screen.getByRole('link', { name: /view on github/i });
    return {GithubUrl};
}

const getCodeEditorUrl = () =>  {
    const codeEditorUrl = screen.getByRole('link', { name: /code editor/i });
    return {codeEditorUrl};
}

const getFileIcon = async() => {
    const fileIcon = await screen.findByRole('img', { name: /javascript/i });
    return {fileIcon};
}

const ensureGithubUrlExists = (GithubUrl) => 
    expect(GithubUrl).toBeInTheDocument();

const ensureGithubUrlIsCorrect = (GithubUrl) => 
    expect(GithubUrl).toHaveAttribute('href', mockRepository.html_url)

const ensureIconHasClasses = (fileIcon) => 
    expect(fileIcon).toHaveClass("icon", "js-icon");

const ensureValidCodeEditorUrl = (codeEditorUrl) => {
    expect(codeEditorUrl).toHaveAttribute('href', `/repositories/${mockRepository.full_name}`);
}


describe("Github Repository Link Test cases", () => {
    test('it should shows github repository link for one repository', async () => 
    {
        showRepositoryListItem();
        const {GithubUrl} = getGithubUrl();
        await getFileIcon();
        ensureGithubUrlExists(GithubUrl);
    })

    test('it should shows the properly url for github repository', async() => {
        showRepositoryListItem();
        const {GithubUrl} = getGithubUrl();
        await getFileIcon();

        ensureGithubUrlIsCorrect(GithubUrl);
    })
})

describe("File Icon Test cases", () => {
    test('shows file icon with the correct language icon', async() => {
        showRepositoryListItem();
        const {fileIcon} = await getFileIcon();

        ensureIconHasClasses(fileIcon);
    })
})

describe("Code Editor test case", () => 
{
    test('it should shows the properly code editor link', async() => {
        showRepositoryListItem();
        await getFileIcon();

        const {codeEditorUrl} = getCodeEditorUrl();
        ensureValidCodeEditorUrl(codeEditorUrl);
    })
})