import {render, screen} from '@testing-library/react';
import axios from 'axios';
import RepositoriesTable from './RepositoriesTable';
import { MemoryRouter } from 'react-router';

const fakeRepoData = [
    {
        id: 11643219,
        label: "Most Popular Javascript",
        repositories: [
            {
                id: 658928958,
                name: 'react',
                full_name: 'react/facebook',
                language: 'JavaScript',
            }, 
        ],
    },
    {
        id: 21540759,
        label: "Most Popular Typescript",
        repositories: [
            {
                id: 110876221,
                name: 'Angular',
                full_name: 'angular/angular',
                language: 'TypeScript',
            },
        ]
    },
    {
        id: 21132159,
        label: "Most Popular Rust",
        repositories: [
            {
                id: 110876221,
                name: 'Rust',
                full_name: 'rust-lang/rust',
                language: 'Rust',
            },
        ]
    },
     {
        id: 21132159,
        label: "Most Popular Go",
        repositories: [
            {
                id: 110876221,
                name: 'Awesome-go',
                full_name: 'avelino/awesome-go',
                language: 'Awesome-go',
            },
        ]
    },
    {
        id: 21132159,
        label: "Most Popular Java",
        repositories: [
            {
                id: 110876221,
                name: 'Spring-boot',
                full_name: 'spring-boot/spring-boot',
                language: 'Java',
            },
        ]
    },
     {
        id: 21132159,
        label: "Most Popular Python",
        repositories: [
            {
                id: 110876221,
                name: 'Python',
                full_name: 'python/python',
                language: 'Python',
            },
        ]
    }
]


const mockAxiosModuleWithJest = () => jest.mock('axios');


const fakeGetRequest = (fakeAxios) => 
{
    fakeAxios.get = jest.fn();

    fakeAxios.get.mockResolvedValue({
        status: 200,
        data: fakeRepoData
    });
}

const fakeCallRequest = () => 
{
    mockAxiosModuleWithJest();

    const fakeAxios = axios;

    fakeGetRequest(fakeAxios);
}

const showRepositoryTable = () => 
{
    for(const fakeRepo of fakeRepoData) {

        const {label, repositories, id} = fakeRepo;

        render(
            <MemoryRouter>
                <RepositoriesTable label={label} repositories={repositories} id={id}></RepositoriesTable> 
            </MemoryRouter>
        )
    }
}

const getQuantityRepos = () => 
{
    const repositories = screen.getAllByText(/most popular/i);
    return {repositories};
}

const ensureQuantityRepos = () => 
{
    const {repositories} = getQuantityRepos();
    expect(repositories).toHaveLength(6);
}

const ensurePythonTextIsPresent = () => 
{
    const {repositories} = getQuantityRepos();

    const IsPythonFound = repositories.some(label => /Python/i.test(label.textContent))

    expect(IsPythonFound).toBe(true);
}

const ensureJavaTextIsPresent = () => 
{
    const {repositories} = getQuantityRepos();

    const IsJavaFound = repositories.some(label => /Java/i.test(label.textContent))

    expect(IsJavaFound).toBe(true);
}


describe('Repositories List test cases', () => {
    test('it should be 6 repositories in total', () => 
    {
        fakeCallRequest();
        showRepositoryTable();
        ensureQuantityRepos();
    })

    test('it should has the Python and Java repositories', () => 
    {
        fakeCallRequest();
        showRepositoryTable();

        ensurePythonTextIsPresent();
        ensureJavaTextIsPresent();
    })
});




