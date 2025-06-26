import {render, screen} from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';

const mockRepository = {
    full_name: 'facebook/react',
    language: 'JavaScript',
    description: 'A js library',
    owner: 'facebook',
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

const ensureGithubUrlExists = (GithubUrl) => 
    expect(GithubUrl).toBeInTheDocument();


test('it should shows github repository link for each repository', () => 
{
    showRepositoryListItem();
    const {GithubUrl} = getGithubUrl();
    ensureGithubUrlExists(GithubUrl);
})
