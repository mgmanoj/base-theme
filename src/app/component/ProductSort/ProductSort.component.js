/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import Select from 'Component/Select';
import './ProductSort.style';

/**
 * Product Sort
 * @class ProductSort
 */
class ProductSort extends Component {
    /**
     * Handle Sort direction change
     * @return {void}
     */
    onGetSortDirection() {
        const { onGetSortDirection, sortDirection } = this.props;
        const newSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';

        onGetSortDirection(newSortDirection);
    }

    renderPlaceholder() {
        return (
            <div block="ProductSort">
                <p block="ProductSort" elem="Placeholder">
                    <TextPlaceholder length="short" />
                </p>
            </div>
        );
    }

    render() {
        const {
            value,
            sortFields,
            sortDirection,
            onGetSortKey
        } = this.props;

        const tempData = [];
        const selectableOptions = sortFields.options && sortFields.options.reduce((selectableOptions, option) => {
            if (option && option.value !== 'size' && option.value !== 'position') {
                tempData.push(option);
            }

            return tempData;
        });

        return (
            sortFields && Object.keys(sortFields).length > 0
                ? (
                    <div block="ProductSort">
                        <span
                          block="ProductSort"
                          elem="Label"
                        >
                            Sort By:
                        </span>
                        <Select
                          block="ProductSort"
                          elem="Select"
                          options={ selectableOptions }
                          selectedOption={ value }
                          onGetSortKey={ onGetSortKey }
                        />
                        <button
                          block="ProductSort"
                          elem="Switch"
                          onClick={ () => this.onGetSortDirection() }
                        >
                            {
                                sortDirection === 'ASC' ? '↑' : '↓'
                            }
                        </button>
                    </div>
                )
                : this.renderPlaceholder()
        );
    }
}

ProductSort.propTypes = {
    onGetSortKey: PropTypes.func.isRequired,
    onGetSortDirection: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    sortFields: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.objectOf(PropTypes.array)
    ]).isRequired
};

export default ProductSort;
