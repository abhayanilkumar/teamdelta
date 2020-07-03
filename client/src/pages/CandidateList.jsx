import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../api';

import styled from 'styled-components';

//import 'react-table/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`;

class CandidateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            columns: [],
            isLoading: false
        };
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getAllCandidates().then(candidates => {
            this.setState({
                candidates: candidates.data.data,
                isLoading: false
            });
        });
    }

    render() {
        const { candidates, isLoading } = this.state;
        console.log('TCL: CandidateList -> render -> Candidate', candidates);

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'First Name',
                accessor: 'firstName',
                filterable: true,
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            // {
            //     Header: '',
            //     accessor: '',
            //     Cell: function(props) {
            //         return (
            //             <span>
            //                 <GetProfile id={props.original._id} />
            //             </span>
            //         )
            //     },
            // },
        ];

        let showTable = true;
        if (!candidates.length) {
            showTable = false;
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={candidates}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default CandidateList;